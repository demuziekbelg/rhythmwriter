// Wacht totdat de pagina volledig geladen is
window.onload = function () {
    const VF = Vex.Flow;

    // Maak een nieuwe VexFlow renderer
    const div = document.getElementById("staff");
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    const context = renderer.getContext();

    // Stel de grootte van het canvas in
    renderer.resize(500, 150);
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Maak de staf
    const stave = new VF.Stave(10, 40, 400); // Positie (10,40) en breedte 400px
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw(); // Teken de staf

    // Voeg een functie toe om noten toe te voegen aan de staf
    function addNote(duration) {
        const note = new VF.StaveNote({ keys: ["c/4"], duration: duration });
        const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables([note]);

        const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 300);
        voice.draw(context, stave);
    }

    // Voeg event listeners toe voor de knoppen in de toolbar
    document.getElementById("whole-note").addEventListener("click", function () {
        addNote("w"); // Hele noot
    });

    document.getElementById("half-note").addEventListener("click", function () {
        addNote("h"); // Halve noot
    });

    document.getElementById("quarter-note").addEventListener("click", function () {
        addNote("q"); // Kwart noot
    });
};
