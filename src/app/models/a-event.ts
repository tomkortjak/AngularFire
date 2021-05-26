export class AEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  status: AEventStatus;
  IsTicked: boolean;
  participationFee: number;
  maxParticipants: number;

  constructor(title?: string, start?: Date, end?: Date, description?: string, status?: number, IsTicked?: boolean,
              participationFee?: number, maxParticipants?: number) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    if (status === 0) {
      this.status = AEventStatus.CANCELED;
    } else if (status === 1) {
      this.status = AEventStatus.DRAFT;
    } else if (status === 2) {
      this.status = AEventStatus.PUBLISHED;
    }
    this.IsTicked = IsTicked;
    this.participationFee = participationFee;
    this.maxParticipants = maxParticipants;
  }

  encode(): string {
    return '{'
      + this.title +
      ', ' + this.start.toString() +
      ', ' + this.end.toString() +
      ', ' + this.description +
      ', ' + this.status.toString() +
      ', ' + this.IsTicked.toString() +
      ', ' + this.participationFee.toString() +
      ', ' + this.maxParticipants.toString() +
      '}';
  }
}

enum AEventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELED = 'CANCELED'
}
