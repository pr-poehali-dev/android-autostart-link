from typing import List, Dict, Any, Tuple
import logging

logger = logging.getLogger(__name__)


class DataProcessor:
    """Обработчик данных для переноса между базами 1С"""
    
    def __init__(self):
        self.supported_types = [
            'nomenclature',
            'counterparty', 
            'document',
            'price',
            'balance'
        ]
    
    def validate_record(self, record: Dict[str, Any]) -> Tuple[bool, str]:
        """Валидация одной записи"""
        if not record.get('id'):
            return False, "Отсутствует ID записи"
        
        if not record.get('type'):
            return False, "Не указан тип записи"
        
        if record['type'] not in self.supported_types:
            return False, f"Неподдерживаемый тип: {record['type']}"
        
        if not record.get('data'):
            return False, "Отсутствуют данные записи"
        
        return True, ""
    
    def transform_data(self, record: Dict[str, Any]) -> Dict[str, Any]:
        """Преобразование данных для целевой базы"""
        transformed = {
            'source_id': record['id'],
            'record_type': record['type'],
            'payload': record['data']
        }
        
        if record.get('timestamp'):
            transformed['imported_at'] = record['timestamp']
        
        return transformed
    
    def process_batch(self, records: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], List[str]]:
        """Обработка пакета записей"""
        processed = []
        errors = []
        
        for i, record in enumerate(records):
            is_valid, error_msg = self.validate_record(record)
            
            if not is_valid:
                errors.append(f"Запись {i}: {error_msg}")
                continue
            
            try:
                transformed = self.transform_data(record)
                processed.append(transformed)
            except Exception as e:
                errors.append(f"Ошибка обработки записи {i}: {str(e)}")
                logger.error(f"Transform error: {e}")
        
        return processed, errors
