import IJobOffer from "./IJobOfer";

class JobOfferData implements IJobOffer {
    jobDetails: string;
    creationDate: Date;

    constructor(jobDetails: string, creationDate: Date) {
        this.jobDetails = jobDetails;
        this.creationDate = creationDate;
    }
}

export default JobOfferData;