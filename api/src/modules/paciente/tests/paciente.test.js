import request from 'supertest';
import { jest } from '@jest/globals';
import app from '../../../app.js';
import { PacienteRepository } from '../repository/paciente.repository.js';

describe('Pacientes API', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Criar paciente com dados válidos - Paciente salvo com UUID único', async () => {
    jest.spyOn(PacienteRepository.prototype, 'criar').mockImplementation(async (data) => ({
      ...data,
      id: '00000000-0000-4000-8000-000000000001',
    }));

    const payload = {
      nome: 'João Silva',
      documento: '12345678901',
      dataNascimento: '1990-01-01',
      telefone: '11999999999',
      celular: '11988888888',
      tipoSanguineo: 'ABN',
      logradouro: 'Rua A',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
    };

    const res = await request(app).post('/pacientes').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.documento).toBe(payload.documento);
  });

  test('Criar paciente com CPF já existente - Erro 409 - duplicidade', async () => {
    jest.spyOn(PacienteRepository.prototype, 'criar').mockImplementation(async () => {
      throw { status: 409, message: 'Paciente já cadastrado' };
    });

    const payload = {
      nome: 'Maria',
      documento: '11122233344',
      dataNascimento: '1985-05-05',
      telefone: '11977777777',
      celular: '11966666666',
      tipoSanguineo: 'ON',
      logradouro: 'Rua B',
      numero: '456',
      bairro: 'Vila',
      cidade: 'São Paulo',
      uf: 'SP',
    };

    const res = await request(app).post('/pacientes').send(payload);

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('erro');
    expect(res.body.erro).toMatch(/Paciente já cadastrado/);
  });

  test('Listar pacientes com paginação - Lista retornada corretamente', async () => {
    const pageResult = {
      data: [
        { id: 'id1', nome: 'A', documento: '1' },
        { id: 'id2', nome: 'B', documento: '2' },
      ],
      pagination: { page: 1, pageSize: 10, total: 2, totalPages: 1 },
    };

    jest.spyOn(PacienteRepository.prototype, 'listar').mockResolvedValue(pageResult);

    const res = await request(app).get('/pacientes').query({ page: 1, pageSize: 10 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.pagination.pageSize).toBe(10);
  });
});
