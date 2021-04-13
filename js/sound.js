export function playSound(name, cam) {

    const listener = new THREE.AudioListener();
    cam.add(listener);

    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(('audio/' + name + '.ogg'), function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.2);
        sound.play();
    });
}