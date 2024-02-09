const butInstall = document.getElementById('buttonInstall');
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('test');
    event.preventDefault();
    // stashes event to be triggered later
    deferredPrompt = event;
    // // shows install button in ui
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
    console.log('testing', deferredPrompt);
    if (!deferredPrompt) {
        return;
      }

      //awaits prompt answer
      const result = await deferredPrompt.prompt();
      console.log(`User choice: ${result.outcome}`);

      //resets deferredPrompt
      deferredPrompt = null;
});


window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully!');
    deferredPrompt = null;
});