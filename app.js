// Wacht totdat de pagina geladen is
window.onload = function() {
    const VF = Vex.Flow;
    const div = document.getElementById("notation-area");

    // Creëer een nieuw VexFlow-scherm
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(window.innerWidth - 40, 200); // Zorg ervoor dat het zich aanpast aan de schermgrootte
    const context = renderer.getContext();

    // Maak een nieuwe notenbalk aan
    const stave = new VF.Stave(10, 40, 400);
    stave.addClef("percussion").setContext(context).draw();

    // Ritmesymbolen
    const quarterNote = new VF.Tickable.Note({ keys: ["c/4"], duration: "4" });
    const eighthNote = new VF.Tickable.Note({ keys: ["c/4"], duration: "8" });
    const sixteenthNote = new VF.Tickable.Note({ keys: ["c/4"], duration: "16" });

    // Functie om noten toe te voegen
    function drawNotes(note) {
        const notes = [note]; // Voeg de geselecteerde noot toe aan een array
        const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(notes);
        new VF.Formatter().joinVoices([voice]).format([voice], 300);
        voice.draw(context, stave);
    }

    // Event listeners voor knoppen
    document.getElementById("quarter-note").addEventListener("click", () => {
        drawNotes(quarterNote);
    });
    document.getElementById("eighth-note").addEventListener("click", () => {
        drawNotes(eighthNote);
    });
    document.getElementById("sixteenth-note").addEventListener("click", () => {
        drawNotes(sixteenthNote);
    });

    // Zorg ervoor dat de weergave zich aanpast bij het veranderen van de schermgrootte
    window.addEventListener("resize", function() {
        renderer.resize(window.innerWidth - 40, 200);
        context.clear();
        stave.setWidth(window.innerWidth - 40).draw();
        drawNotes(quarterNote);  // Herteken de laatste noot na resizing
    });
};
