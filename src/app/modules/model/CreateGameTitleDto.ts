export class CreateGameTitleDto {
    title:string;
    description: string;
    image!: File | undefined;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
     }
}