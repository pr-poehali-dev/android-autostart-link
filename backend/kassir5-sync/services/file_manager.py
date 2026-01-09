import os
import shutil
from pathlib import Path
from typing import Tuple, Optional
import logging

logger = logging.getLogger(__name__)


class FileManager:
    """Менеджер файлов для работы с Кассир 5"""
    
    def __init__(self):
        self.filename = "45.pos"
        self.target_network = r"\\192.168.0.3\Update\CJlaBa"
    
    def check_file_exists(self, source_path: str) -> Tuple[bool, Optional[dict]]:
        """Проверка существования файла"""
        try:
            full_path = os.path.join(source_path, self.filename)
            
            if not os.path.exists(full_path):
                return False, None
            
            stat = os.stat(full_path)
            
            return True, {
                'path': full_path,
                'size': stat.st_size,
                'last_modified': stat.st_mtime
            }
        except Exception as e:
            logger.error(f"Error checking file: {e}")
            return False, None
    
    def check_network_accessible(self, network_path: str) -> bool:
        """Проверка доступности сетевой папки"""
        try:
            # Проверяем существование сетевого пути
            return os.path.exists(network_path) or os.path.isdir(network_path)
        except Exception as e:
            logger.error(f"Network path not accessible: {e}")
            return False
    
    def move_file(self, source_path: str, target_path: str) -> Tuple[bool, str, Optional[int]]:
        """
        Перемещение файла из исходной папки в целевую
        Возвращает: (успех, сообщение, размер_файла)
        """
        try:
            source_file = os.path.join(source_path, self.filename)
            
            # Проверка исходного файла
            if not os.path.exists(source_file):
                return False, f"Файл {self.filename} не найден в {source_path}", None
            
            # Получаем размер файла
            file_size = os.path.getsize(source_file)
            
            # Создаем целевую папку если не существует
            os.makedirs(target_path, exist_ok=True)
            
            target_file = os.path.join(target_path, self.filename)
            
            # Перемещаем файл
            shutil.move(source_file, target_file)
            
            # Проверяем что файл действительно переместился
            if os.path.exists(target_file):
                return True, f"Файл успешно перемещен в {target_path}", file_size
            else:
                return False, "Ошибка при перемещении файла", None
                
        except PermissionError:
            return False, "Нет прав доступа к файлу или целевой папке", None
        except Exception as e:
            logger.error(f"Error moving file: {e}")
            return False, f"Ошибка: {str(e)}", None
    
    def get_file_info(self, path: str) -> dict:
        """Получение информации о файле"""
        try:
            full_path = os.path.join(path, self.filename)
            
            if not os.path.exists(full_path):
                return {
                    'exists': False,
                    'accessible': False
                }
            
            stat = os.stat(full_path)
            
            return {
                'exists': True,
                'path': full_path,
                'size': stat.st_size,
                'last_modified': stat.st_mtime,
                'accessible': True
            }
        except Exception as e:
            logger.error(f"Error getting file info: {e}")
            return {
                'exists': False,
                'accessible': False,
                'error': str(e)
            }
