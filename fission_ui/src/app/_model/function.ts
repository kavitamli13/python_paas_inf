export class Function {

     //Create function parameters
    public functionName? : string;
    public functionImage? : string;
    public projectName : string = "";
    public createdTime?: any;
    public handlerFileContent? : string;
    public dependencyFileContent? : string;
    public handlerFileName? : string;
    public dependencyFileName? : string;
    public functionStatus? : string;
    public runtime? : string;
    public infraRequirement? : string;
    public functionType? : string;


    //Response
    public message? : string;

    //Deploy Function parameters
    public triggerType? : string;
    public environmentVariables? : Map<string,string>;
    public labels? : any;
    public annotations? : any;
    public secrets? : string[];
    public limits? : Map<string,string>;


    //FunctionLog Parameters
    public timestamp? : string;
    public text? : string;

    //description parameters
    public invocationCount? : number;
    public functionUrl? : string;
}
