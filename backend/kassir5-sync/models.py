from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class FileMoveRequest(BaseModel):
    """Запрос на перемещение файла"""
    source_path: str = Field(..., description="Путь к исходному файлу")
    filename: str = Field(default="45.pos", description="Имя файла")
    target_network_path: str = Field(
        default=r"\\192.168.0.3\Update\CJlaBa",
        description="Сетевой путь назначения"
    )


class FileMoveResponse(BaseModel):
    """Ответ на запрос перемещения"""
    success: bool
    message: str
    source_path: Optional[str] = None
    target_path: Optional[str] = None
    file_size: Optional[int] = None
    timestamp: str
    error: Optional[str] = None


class FileStatusResponse(BaseModel):
    """Статус файла"""
    exists: bool
    path: Optional[str] = None
    size: Optional[int] = None
    last_modified: Optional[str] = None
    accessible: bool
