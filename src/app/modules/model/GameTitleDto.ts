import { CommentDto } from "./CommentDto";

export class GameTitleDto {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public imageUrl: string,
        public createdBy: string,
        public createdById: number,
        public likes: number[],
        public comments: CommentDto[]
    ) { }
}