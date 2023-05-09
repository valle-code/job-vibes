import IJobOffer from "./IJobOfer";

class JobOfferData implements IJobOffer {
    id: number;
    jobTitle: string;
    jobDescription: string;
    jobThumbnail: string;
    jobDetails: string;
    creationDate: Date;

    constructor(id: number, jobTitle: string, jobDescription: string, jobThumbnails: string, jobDetails: string, creationDate: Date) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.jobThumbnail = jobThumbnails;
        this.jobDetails = jobDetails;
        this.creationDate = creationDate;
    }
}

export default JobOfferData;