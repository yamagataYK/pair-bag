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
    allow_origins=origins,      #←ここを環境に合わせて
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ultralytics が自動で weights をダウンロード
model = YOLO("yolov8n.pt")

@app.post("/detect", response_model=List[str])
async def detect(file: UploadFile = File(...)) -> List[str]:
    try:
        # バイトを読み込んで PIL 画像に変換
        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

        # 推論。results[0] の boxes.cls からクラスIDを取り出す
        results = model(img)
        names: Set[str] = set(int(cls) for cls in [])
        for cls in results[0].boxes.cls:
            names.add(model.names[int(cls)])
        return list(names)

    except Exception as e:
        # サーバー側ログにエラー詳細を出す
        print("🔥 detect error:", e)
        # ブラウザには 500 とエラーメッセージを返す
        raise HTTPException(status_code=500, detail=str(e))
