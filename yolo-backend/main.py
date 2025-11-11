from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from typing import List, Set
import io
from PIL import Image

app = FastAPI()

# フロントが動くオリジンを指定
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = YOLO("yolov8n.pt")

@app.post("/detect", response_model=List[str])
async def detect(file: UploadFile = File(...)) -> List[str]:
    try:

        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")


        results = model(img)
        names: Set[str] = set(int(cls) for cls in [])
        for cls in results[0].boxes.cls:
            names.add(model.names[int(cls)])
        return list(names)

    except Exception as e:

        print("🔥 detect error:", e)

        raise HTTPException(status_code=500, detail=str(e))
