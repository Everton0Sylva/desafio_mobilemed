import request from 'supertest';
import { jest } from '@jest/globals';
import app from '../../../app.js';
import { PacienteRepository } from '../../paciente/repository/paciente.repository.js';
import { ProcedimentoRepository } from '../../procedimento/repository/procedimento.repository.js';
import { ExameRepository } from '../repository/exame.repository.js';

describe('Exames API - idempotência e fluxos', () => {
  afterEach(() => jest.restoreAllMocks());

  test('Criar exame com paciente existente e idempotencyKey nova - HTTP 201 e exame salvo', async () => {
    jest.spyOn(PacienteRepository.prototype, 'buscarPorId').mockResolvedValue({ id: 'p1' });
    jest.spyOn(ProcedimentoRepository.prototype, 'buscarPorId').mockResolvedValue({ id: 'proc1' });
      jest.spyOn(ExameRepository.prototype, 'criar').mockImplementation(async (data) => ({
        exame: { ...data, id: 'exame-1' },
        created: true,
      }));

    const payload = {
      pacienteId: '00000000-0000-4000-8000-000000000001',
      idProcedimento: '00000000-0000-4000-8000-000000000002',
      idempotencyKey: 'key-1',
    };

    const res = await request(app).post('/exames').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('Reenviar exame com mesma idempotencyKey - HTTP 200 e retorno do mesmo exame', async () => {
    jest.spyOn(PacienteRepository.prototype, 'buscarPorId').mockResolvedValue({ id: 'p1' });
    jest.spyOn(ProcedimentoRepository.prototype, 'buscarPorId').mockResolvedValue({ id: 'proc1' });

    const storage = new Map();

      jest.spyOn(ExameRepository.prototype, 'criar').mockImplementation(async (data) => {
        const key = data.idempotencyKey;
        if (storage.has(key)) return { exame: storage.get(key), created: false };
        const created = { ...data, id: `exame-${storage.size + 1}` };
        storage.set(key, created);
        return { exame: created, created: true };
      });

    const payload = {
      pacienteId: '00000000-0000-4000-8000-000000000003',
      idProcedimento: '00000000-0000-4000-8000-000000000004',
      idempotencyKey: 'idem-1',
    };

    const res1 = await request(app).post('/exames').send(payload);
    const res2 = await request(app).post('/exames').send(payload);

    expect(res1.status).toBe(201);
    // According to spec, second request should return 200 and same exame
    expect(res2.status).toBe(200);
    expect(res1.body.id).toBe(res2.body.id);
  });

  test('Enviar múltiplas requisições simultâneas com mesma idempotencyKey - Apenas um exame persistido', async () => {
    jest.spyOn(PacienteRepository.prototype, 'buscarPorId').mockResolvedValue({ id: 'p1' });
    jest.spyOn(ProcedimentoRepository.prototype, 'buscarPorId').mockResolvedValue({ id: 'proc1' });

    const storage = new Map();
    let createCalls = 0;
    const pendingCreates = new Map();

      jest.spyOn(ExameRepository.prototype, 'criar').mockImplementation(async (data) => {
        const key = data.idempotencyKey;
        if (storage.has(key)) {
          return { exame: storage.get(key), created: false };
        }

        if (pendingCreates.has(key)) {
          const exame = await pendingCreates.get(key);
          return { exame, created: false };
        }

        createCalls++;
        const createPromise = (async () => {
          await new Promise((r) => setTimeout(r, 50));
          const created = { ...data, id: `exame-${storage.size + 1}` };
          storage.set(key, created);
          pendingCreates.delete(key);
          return created;
        })();

        pendingCreates.set(key, createPromise);
        const exame = await createPromise;
        return { exame, created: true };
      });

    const payload = {
      pacienteId: '00000000-0000-4000-8000-000000000005',
      idProcedimento: '00000000-0000-4000-8000-000000000006',
      idempotencyKey: 'idem-concurrent',
    };

    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(request(app).post('/exames').send(payload));
    }

    const results = await Promise.all(promises);

    const ids = new Set(results.map((r) => r.body.id));

    expect(ids.size).toBe(1);
    expect(createCalls).toBeGreaterThanOrEqual(1);
  });

  test('Criar exame com paciente inexistente - Erro 400 - paciente não encontrado', async () => {
    jest.spyOn(PacienteRepository.prototype, 'buscarPorId').mockResolvedValue(null);

    const payload = { pacienteId: 'nope', idProcedimento: 'proc1', idempotencyKey: 'k2' };

    const res = await request(app).post('/exames').send(payload);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  test('Listar exames com paginação (10 por página) - Retorno paginado corretamente', async () => {
    jest.spyOn(ExameRepository.prototype, 'listar').mockResolvedValue({
      data: Array.from({ length: 10 }, (_, i) => ({ id: `e${i + 1}` })),
      total: 25,
      page: 1,
      pageSize: 10,
      totalPages: 3,
    });

    const res = await request(app).get('/exames').query({ page: 1, pageSize: 10 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.pageSize).toBe(10);
    expect(res.body.total).toBe(25);
  });
});
