/* ############################################ WIZARD STEP ############################################ */
class Steps{
    constructor(){}
    /* ------- Cambia de step ------- */
    changeStep(steps, current, next, limit){
        // Revisa el limite y que no sea el mismo link
        if(next >= limit || next == current) return current;

        // Desactiva el link actual
        $("li[data-index='" + current + "']").removeClass('active');

        // Deshabilida los links siguientes, si es que se selecciono algo anterior
        if(next < current)
            for(let i = next; i < limit; i++)
                $("li[data-index='" + i + "']").addClass('disabled');

        // Habilita el siguiente link
        if($("li[data-index='" + next + "']").hasClass('disabled'))
            $("li[data-index='" + next + "']").removeClass('disabled');

        // Activa el siguiente link
        $("li[data-index='" + next + "']").addClass('active'); 

        // Oculta todos los steps
        steps.hide();

        // Muestra el nuevo step
        $($("li[data-index='" + next + "'] a").attr("href")).show();
        return next;
    }
    /* ------- Inicializa los eventos de step ------- */
    initializeSteps(changeCallback){
        var navListItems = $('ul.setup-panel li a');
        var allSteps = $('.setup-content');
        allSteps.hide();
        navListItems.click((e) => {
            e.preventDefault();
            // Obtiene el li que fue presionado
            var $liItem = $(e.target).closest('li');
            // Revisa que el li este activado
            if (!$liItem.hasClass('disabled')) {
                actualStep = this.changeStep(allSteps, parseInt(actualStep), parseInt($liItem.attr("data-index")), 4);
                changeCallback(parseInt($liItem.attr("data-index")));
            }
        });
        // Triggerea el primer li
        $('ul.setup-panel li.active a').trigger('click');
        // El step se pone en 0
        var actualStep = 0;
        // Boton de next
        $('#next').on('click', (e) => {
            actualStep = this.changeStep(allSteps, parseInt(actualStep), parseInt(actualStep) + 1, 4);
            changeCallback(parseInt(actualStep) + 1);
        });
    }
}