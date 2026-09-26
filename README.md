# Smart Resort 360

## Architecture
- **Frontend**: React + Vite + Tailwind (Port 5173) -> `/frontend`
- **Backend**: Node.js + Express (Port 5000) -> `/backend`
- **ML Service**: Python + FastAPI (Port 8000) -> `/ml-service`
- **Shared**: API Contracts -> `/shared`

## Starting Local Services
1. **Frontend**: `cd frontend && npm install && npm run dev`
2. **Backend**: `cd backend && npm install && npm run dev`
3. **ML Service**: `cd ml-service && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000`
