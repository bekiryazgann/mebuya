import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function Header() {
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [showMusicDialog, setShowMusicDialog] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Constants for localStorage keys
    const MUSIC_POSITION_KEY = 'wordPuzzleMusicPosition';

    // Function to reset the game
    const handleReset = () => {
        localStorage.removeItem('wordPuzzleGameState');
        localStorage.removeItem(MUSIC_POSITION_KEY); // Also clear the saved music position
        window.location.reload();
    };

    // Function to toggle music
    const toggleMusic = () => {
        const audioElement = document.getElementById('backgroundMusic') as HTMLAudioElement;
        if (isMusicPlaying) {
            audioElement.pause();
        } else {
            // Check if there's a saved position and restore it
            const savedPosition = localStorage.getItem(MUSIC_POSITION_KEY);
            if (savedPosition) {
                audioElement.currentTime = parseFloat(savedPosition);
            }

            audioElement.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
        setIsMusicPlaying(!isMusicPlaying);
    };

    // Function to enable music
    const enableMusic = () => {
        const audioElement = document.getElementById('backgroundMusic') as HTMLAudioElement;
        if (audioElement) {
            audioElement.volume = 0.5; // Set volume to 50%

            // Check if there's a saved position and restore it
            const savedPosition = localStorage.getItem(MUSIC_POSITION_KEY);
            if (savedPosition) {
                audioElement.currentTime = parseFloat(savedPosition);
            }

            audioElement.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
            setIsMusicPlaying(true);
        }
        setShowMusicDialog(false);
    };

    // Function to decline music
    const declineMusic = () => {
        setShowMusicDialog(false);
    };

    // Save music position periodically and when page is unloaded
    useEffect(() => {
        const audioElement = document.getElementById('backgroundMusic') as HTMLAudioElement;

        // Function to save the current position
        const savePosition = () => {
            if (audioElement && !audioElement.paused) {
                localStorage.setItem(MUSIC_POSITION_KEY, audioElement.currentTime.toString());
            }
        };

        // Set up interval to save position every 5 seconds
        const intervalId = setInterval(savePosition, 5000);

        // Save position when page is unloaded
        window.addEventListener('beforeunload', savePosition);

        // Clean up
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', savePosition);
        };
    }, [MUSIC_POSITION_KEY]);

    return (
        <div className="py-4 px-6 text-primary-900">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Mebuya</h1>
                    <p className="text-sm text-primary-700">Romantik kelime bulmacası</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">💖</span>
                        <span className="text-2xl">🌹</span>
                        <span className="text-2xl">😊</span>
                    </div>
                    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="bg-primary-200 hover:bg-primary-400">
                                Oyun Menüsü
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="bg-primary-100">
                            <DrawerHeader>
                                <DrawerTitle className="text-primary-900">Oyun Menüsü</DrawerTitle>
                                <DrawerDescription className="text-primary-700">
                                    Oyun ayarlarını buradan değiştirebilirsiniz.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 space-y-4">
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start bg-primary-200 hover:bg-primary-300 text-primary-900"
                                    onClick={() => {
                                        toggleMusic();
                                        setDrawerOpen(false);
                                    }}
                                >
                                    {isMusicPlaying ? "Müziği Kapat" : "Müziği Aç"}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start bg-primary-200 hover:bg-primary-300 text-red-600"
                                    onClick={() => {
                                        handleReset();
                                        setDrawerOpen(false);
                                    }}
                                >
                                    Oyunu Sıfırla
                                </Button>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="bg-primary-200 hover:bg-primary-400">
                                        Kapat
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>

            {/* Background Music */}
            <audio id="backgroundMusic" loop>
                <source src="/music.wav" type="audio/wav" />
                Tarayıcınız ses dosyasını desteklemiyor.
            </audio>

            {/* Music Confirmation Dialog */}
            <AlertDialog open={showMusicDialog} onOpenChange={setShowMusicDialog}>
                <AlertDialogContent className="bg-primary-100 border border-primary-300">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-primary-900">Müzik Onayı</AlertDialogTitle>
                        <AlertDialogDescription className="text-primary-700">
                            Arka plan müziğini etkinleştirmek ister misiniz?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel 
                            className="bg-primary-200 hover:bg-primary-300 text-primary-900"
                            onClick={declineMusic}
                        >
                            Hayır
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-primary-400 hover:bg-primary-500 text-primary-900"
                            onClick={enableMusic}
                        >
                            Evet
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
