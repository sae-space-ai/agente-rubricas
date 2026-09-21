// Servicio de API para comunicación con el backend FastAPI

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface RubricRequest {
  asignatura: string;
  curso: string;
}

export interface RubricResponse {
  rubrica: string;
  asignatura: string;
  curso: string;
}

export interface HealthResponse {
  status: string;
  service?: string;
}

export async function generarRubrica(request: RubricRequest): Promise<RubricResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generar-rubrica`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Error desconocido' }));
      throw new Error(errorData.detail || `Error HTTP: ${response.status}`);
    }

    const data: RubricResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error de conexión con el servidor');
  }
}

export async function checkHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return { status: 'offline' };
  }
}
