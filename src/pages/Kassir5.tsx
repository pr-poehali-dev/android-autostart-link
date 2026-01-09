import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Kassir5 = () => {
  const downloadScript = () => {
    const link = document.createElement('a');
    link.href = '/kassir5_sync.bat';
    link.download = 'kassir5_sync.bat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={18} />
            Назад
          </Button>
        </div>

        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Icon name="Database" size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Выгрузка из Кассир 5</h1>
          <p className="text-gray-500">Автоматическое перемещение файла 45.pos в сетевую папку</p>
        </header>

        <Card className="p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="Download" size={24} className="text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Скрипт автоматической выгрузки</h2>
              <p className="text-gray-600 mb-4">
                BAT-файл для автоматического перемещения файла 45.pos из папки программы Кассир 5 
                в сетевую папку \\192.168.0.3\Update\CJlaBa
              </p>
              <Button onClick={downloadScript} className="gap-2">
                <Icon name="Download" size={18} />
                Скачать kassir5_sync.bat
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Что делает скрипт
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-600">Проверяет наличие файла 45.pos в папке программы Кассир 5</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-600">Проверяет доступность сетевой папки \\192.168.0.3\Update\CJlaBa</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-600">Перемещает файл в сетевую папку</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-600">Проверяет успешность операции и сохраняет лог</p>
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={20} />
            Инструкция по использованию
          </h3>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
              <div>
                <p className="font-medium text-gray-900">Скачайте скрипт</p>
                <p className="text-sm text-gray-600">Нажмите кнопку "Скачать kassir5_sync.bat" выше</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
              <div>
                <p className="font-medium text-gray-900">Проверьте путь к Кассир 5</p>
                <p className="text-sm text-gray-600">По умолчанию: C:\Program Files\Kassa5</p>
                <p className="text-sm text-gray-600 mt-1">Если у вас другой путь, откройте .bat файл в блокноте и измените строку SOURCE_PATH</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
              <div>
                <p className="font-medium text-gray-900">Запустите скрипт</p>
                <p className="text-sm text-gray-600">Двойной клик по файлу kassir5_sync.bat</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
              <div>
                <p className="font-medium text-gray-900">Проверьте результат</p>
                <p className="text-sm text-gray-600">Скрипт покажет результат операции и создаст лог-файл kassir5_sync_log.txt</p>
              </div>
            </li>
          </ol>
        </Card>

        <Card className="p-8 border-amber-200 bg-amber-50">
          <div className="flex gap-4">
            <Icon name="AlertTriangle" size={24} className="text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Важно</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Убедитесь, что у вас есть права доступа к сетевой папке</li>
                <li>• Программа Кассир 5 должна быть закрыта при выгрузке файла</li>
                <li>• Проверьте, что файл 45.pos существует в папке программы</li>
                <li>• Сетевой путь должен быть доступен (\\192.168.0.3)</li>
              </ul>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Kassir5;
