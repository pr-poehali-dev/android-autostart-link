from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime


class DataRecord(BaseModel):
    """Запись данных для выгрузки"""
    id: str = Field(..., description="Уникальный ID записи")
    type: str = Field(..., description="Тип документа (номенклатура, контрагент и т.д.)")
    data: Dict[str, Any] = Field(..., description="Данные записи")
    timestamp: Optional[str] = Field(None, description="Временная метка")


class TransferRequest(BaseModel):
    """Запрос на выгрузку данных"""
    source_base: str = Field(..., description="ID исходной базы")
    target_base: str = Field(..., description="ID целевой базы")
    records: List[DataRecord] = Field(..., description="Список записей для переноса")
    mode: str = Field(default="sync", description="Режим: sync или async")


class TransferResponse(BaseModel):
    """Ответ на запрос выгрузки"""
    success: bool
    transferred_count: int
    failed_count: int
    errors: List[str] = []
    transfer_id: str
    timestamp: str
