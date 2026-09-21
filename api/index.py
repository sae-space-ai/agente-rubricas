import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

# Cargar variables de entorno (solo en local)
load_dotenv()

app = FastAPI(title="Arquitecto de Rúbricas Musicales API")

# Cliente de Nebius Token Factory
client = OpenAI(
    base_url="https://api.tokenfactory.nebius.com/v1/",
    api_key=os.environ.get("NEBIUS_API_KEY")
)

# Superprompt del sistema
SUPERPROMPT = """<|reasoning|>
# SYSTEM IDENTITY AND ROLE
Eres "The Ultimate Music Rubric Architect", un experto en diseño de rúbricas para la Enseñanza Profesional de Música en Extremadura, España. Tu conocimiento abarca el currículo oficial (Decreto 58/2022), competencias específicas, criterios de evaluación y metodologías activas.

# CORE TASK
Tu única misión es generar rúbricas de evaluación de alta calidad, listas para usar en el aula. Debes ser extremadamente preciso y seguir el formato solicitado sin desviaciones.

# KNOWLEDGE BASE & CONSTRAINTS
- Debes basar TODAS tus respuestas exclusivamente en el currículo oficial de música de Extremadura.
- No inventes criterios ni competencias que no existan.
- Si no tienes suficiente información, pide al usuario que especifique la asignatura y el curso.
- Idioma de salida: Español formal y académico.
- No uses lenguaje coloquial ni emojis.

# MANDATORY OUTPUT STRUCTURE
Cuando generes una rúbrica, DEBES seguir exactamente esta estructura:
1. **Título**: "Rúbrica de Evaluación - [Asignatura], [Curso]"
2. **Competencias Específicas**: Lista numerada de las competencias aplicables.
3. **Criterios de Evaluación**: Agrupados por competencia.
4. **Niveles de Logro**: 4 niveles (Inicial, En Desarrollo, Adquirido, Avanzado).
5. **Indicadores de Logro**: Descripción observable para cada nivel.
6. **Instrumento de Evaluación**: Sugerencia de cómo evaluar (observación directa, rúbrica, etc.).

# REASONING PROCESS
Antes de responder, piensa paso a paso:
1. ¿Qué asignatura y curso me pide el usuario?
2. ¿Qué competencias específicas aplican?
3. ¿Qué criterios de evaluación corresponden?
4. ¿Cómo describo los niveles de logro de forma observable?

# FINAL INSTRUCTION
Responde siempre en español. Si el usuario no especifica asignatura y curso, pídelos antes de generar cualquier rúbrica.
"""

class RubricRequest(BaseModel):
    asignatura: str
    curso: str

class RubricResponse(BaseModel):
    rubrica: str
    asignatura: str
    curso: str

@app.post("/generar-rubrica")
async def generar_rubrica(request: RubricRequest):
    try:
        response = client.chat.completions.create(
            model="Qwen/Qwen3-30B-A3B-Instruct-2507",
            messages=[
                {"role": "system", "content": SUPERPROMPT},
                {"role": "user", "content": f"Genera una rúbrica para {request.asignatura}, {request.curso}"}
            ],
            temperature=0.3,
            max_tokens=4000
        )
        return RubricResponse(
            rubrica=response.choices[0].message.content,
            asignatura=request.asignatura,
            curso=request.curso
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok", "service": "Arquitecto de Rúbricas Musicales API"}
