/* ############################################ GRID ############################################ */
class Grid{
    constructor(){
        this.selections = 0;
    }
    /* ------- Inicializa los eventos de los botones del grid ------- */
    initializeGrid(sectores){
        return new Promise((resolve, reject) => {
            // Animacion de grid item
            var showingButtons;
            var selections = 0;
            $(".pic").on("mouseenter focus", (e)=>{
                if(!$(e.target).closest(".pic").hasClass("seleccionado")){
                    showingButtons = setTimeout(()=>{
                        $(e.target).parent().find(".botonera").fadeIn(666);
                    },333);
                }
            });
            $(".pic").on("mouseleave blur", (e)=>{
                clearTimeout(showingButtons);
                $(e.target).parent().find("button").hide();
                $(e.target).parent().find(".botonera").fadeOut(666,()=>{
                    $(e.target).parent().find("button").show();
                });
            });
            // Selecciona servicio
            $(".izquierdo").click((e)=>{
                let index = $(e.target).closest(".pic").attr("data-index");
                sectores[index].selected = true;
                $(e.target).closest(".pic").addClass("seleccionado")
                $(e.target).closest(".pic").find("button").hide();
                $(e.target).closest(".pic").find(".botonera").fadeOut(666,()=>{
                    $(e.target).closest(".pic").find("button").show();
                });
                this.checkGrid(1);
            });
            // Deselecciona servicio
            $(".iconoGrid").click((e)=>{
                let index = $(e.target).closest(".pic").attr("data-index");
                sectores[index].selected = false;
                $(e.target).closest(".pic").removeClass("seleccionado");
                $(e.target).closest(".pic").find(".botonera").fadeIn(666);
                this.checkGrid(-1);
            });
            // Abre modal de informacion
            $(".derecho").click((e)=>{
                $("#infoServicio").modal("show");
            });
            resolve();
        });
    }
    /* ------- Valida la seleccion del grid ------- */
    checkGrid(adjust){
        this.selections += adjust;
        if(this.selections >= 1 && this.selections <= 3){
            $("#next").removeAttr("disabled");
        }else if(this.selections == 0){
            $("#next").attr("disabled", "true");
        }
    }
}