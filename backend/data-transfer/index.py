"""API для обработки выгрузки данных между базами 1С"""

import json
from datetime import datetime
from typing import Dict, Any
from models import TransferRequest, TransferResponse
from services.processor import DataProcessor


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    """
    Обрабатывает выгрузку данных из одной базы 1С в другую.
    Принимает данные, валидирует, преобразует и отправляет в целевую базу.
    """
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            
            # Валидация запроса через Pydantic
            transfer_req = TransferRequest(**body)
            
            # Обработка данных
            processor = DataProcessor()
            processed_records, errors = processor.process_batch(
                [r.dict() for r in transfer_req.records]
            )
            
            # Формирование ответа
            response = TransferResponse(
                success=len(errors) == 0,
                transferred_count=len(processed_records),
                failed_count=len(errors),
                errors=errors[:10],  # Ограничиваем количество ошибок
                transfer_id=f"transfer_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                timestamp=datetime.now().isoformat()
            )
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(response.dict(), ensure_ascii=False),
                'isBase64Encoded': False
            }
            
        except ValueError as e:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Ошибка валидации данных',
                    'details': str(e)
                }, ensure_ascii=False),
                'isBase64Encoded': False
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Внутренняя ошибка сервера',
                    'details': str(e)
                }, ensure_ascii=False),
                'isBase64Encoded': False
            }
    
    # GET запрос - информация о сервисе
    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'service': 'Data Transfer API',
                'version': '1.0',
                'supported_types': [
                    'nomenclature',
                    'counterparty',
                    'document',
                    'price',
                    'balance'
                ],
                'methods': ['POST']
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Метод не поддерживается'}, ensure_ascii=False),
        'isBase64Encoded': False
    }
