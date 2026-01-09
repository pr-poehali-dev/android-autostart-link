import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface Bookmark {
  id: string;
  url: string;
  title: string;
}

const Index = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [autoLaunchUrl, setAutoLaunchUrl] = useState('');

  useEffect(() => {
    const defaultUrl = 'https://gotospin.net/index.php?with=1';
    const isFirstVisit = !localStorage.getItem('hasVisited');
    
    if (isFirstVisit) {
      localStorage.setItem('autoLaunchUrl', defaultUrl);
      localStorage.setItem('hasVisited', 'true');
      setAutoLaunchUrl(defaultUrl);
      
      const defaultBookmark: Bookmark = {
        id: '1',
        url: defaultUrl,
        title: 'GoToSpin'
      };
      localStorage.setItem('bookmarks', JSON.stringify([defaultBookmark]));
      setBookmarks([defaultBookmark]);
    } else {
      const savedBookmarks = localStorage.getItem('bookmarks');
      const savedAutoLaunch = localStorage.getItem('autoLaunchUrl');
      
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
      
      if (savedAutoLaunch) {
        setAutoLaunchUrl(savedAutoLaunch);
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const autoRedirect = urlParams.get('autoRedirect');
    const savedAutoLaunch = localStorage.getItem('autoLaunchUrl');
    if (autoRedirect === 'true' && savedAutoLaunch) {
      window.location.href = savedAutoLaunch;
    }
  }, []);

  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  const addBookmark = () => {
    if (!newUrl) {
      toast({
        title: "Ошибка",
        description: "Введите URL сайта",
        variant: "destructive"
      });
      return;
    }

    const bookmark: Bookmark = {
      id: Date.now().toString(),
      url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
      title: newTitle || newUrl
    };

    saveBookmarks([...bookmarks, bookmark]);
    setNewUrl('');
    setNewTitle('');
    
    toast({
      title: "Добавлено",
      description: "Сайт добавлен в избранное"
    });
  };

  const removeBookmark = (id: string) => {
    saveBookmarks(bookmarks.filter(b => b.id !== id));
    toast({
      title: "Удалено",
      description: "Сайт удален из избранного"
    });
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  const setAsAutoLaunch = (url: string) => {
    localStorage.setItem('autoLaunchUrl', url);
    setAutoLaunchUrl(url);
    toast({
      title: "Автозапуск установлен",
      description: "Этот сайт будет открываться автоматически"
    });
  };

  const clearAutoLaunch = () => {
    localStorage.removeItem('autoLaunchUrl');
    setAutoLaunchUrl('');
    toast({
      title: "Автозапуск отключен"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Icon name="Rocket" size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Автозапуск</h1>
          <p className="text-gray-500">Быстрый доступ к вашим сайтам</p>
          
          <div className="flex gap-4 mt-6">
            <Card className="flex-1 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Icon name="Smartphone" size={20} />
                Установите на главный экран
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Нажмите <Icon name="MoreVertical" size={16} className="inline" /> в браузере → "Добавить на главный экран"
              </p>
              <div className="text-xs text-gray-500 bg-white/60 rounded-lg p-3">
                После установки иконка будет автоматически открывать GoToSpin
              </div>
            </Card>
            
            <Card 
              className="flex-1 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => window.location.href = '/kassir5'}
            >
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Icon name="Database" size={20} />
                Выгрузка из Кассир 5
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Скачайте BAT-скрипт для автоматической выгрузки файла 45.pos
              </p>
              <div className="text-xs text-gray-500 bg-white/60 rounded-lg p-3">
                Перемещение в сетевую папку \\192.168.0.3\Update\CJlaBa
              </div>
            </Card>
          </div>
        </header>

        {autoLaunchUrl && (
          <Card className="p-6 mb-8 border-primary/20 bg-blue-50/50 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Автозапуск</p>
                  <p className="font-medium text-gray-900">{autoLaunchUrl}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={clearAutoLaunch}
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="Plus" size={20} />
            Добавить сайт
          </h2>
          <div className="space-y-3">
            <Input 
              placeholder="URL сайта (например, google.com)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="h-12"
            />
            <Input 
              placeholder="Название (необязательно)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="h-12"
            />
            <Button 
              onClick={addBookmark}
              className="w-full h-12 text-base"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить
            </Button>
          </div>
        </Card>

        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="Star" size={20} />
            Избранное
          </h2>
          
          {bookmarks.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="Bookmark" size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-500">Нет сохраненных сайтов</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bookmark) => (
                <Card 
                  key={bookmark.id} 
                  className="p-4 hover:shadow-md transition-shadow animate-fade-in"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Globe" size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{bookmark.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setAsAutoLaunch(bookmark.url)}
                        title="Установить автозапуск"
                      >
                        <Icon name="Zap" size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openUrl(bookmark.url)}
                      >
                        <Icon name="ExternalLink" size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeBookmark(bookmark.id)}
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Index;