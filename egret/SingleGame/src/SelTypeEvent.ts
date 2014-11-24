class SelTypeEvent extends egret.Event{
    public static SELECT:string = "selectedSex";
    public static COMFIRM:string = "goplay";
    public static COMPLETE:string = "completeGame";
    public static PLAYAGAIN:string = "playAgain";

    public _sex:number = 0;
    public _data:any;

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }
}