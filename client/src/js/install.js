const butInstall = document.getElementById('buttonInstall');

//ask tutor about this file

window.addEventListener('beforeinstallprompt', (event) => {

    event.preventDefault();
    // stashes event to be triggered later
    window.deferredPrompt = event;
    // shows install button in ui
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        // deferred prompt isn't available.
        return;
    }

    // shows prompt
    promptEvent.prompt();

    //resets the deferred prompt variable
    window.deferredPrompt = null;

    // hides install button on click
    butInstall.style.display = 'none';
});


window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully!');
    window.deferredPrompt = null;
});