package app.models;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.annotation.Id;
import app.views.EventView;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import java.util.Date;

@Entity
public class AEvent {

  @Id
  @GeneratedValue
  @JsonView(EventView.OnlyIdTitleAndStatus.class)
  protected long id;

  @JsonView(EventView.OnlyIdTitleAndStatus.class)
  String title;

  Date start;
  Date end;
  String description;

  @JsonView(EventView.OnlyIdTitleAndStatus.class)
  AEventStatus status;

  boolean IsTicked;
  double participationFee;
  int maxParticipants;

  public AEvent(){}

  public AEvent(String title,
                Date start,
                Date end,
                String description,
                String status,
                boolean IsTicked,
                double participationFee,
                int maxParticipants) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    if (status.toString().equals("0")) {
      this.status = AEventStatus.CANCELED;
    } else if (status.toString().equals("1")) {
      this.status = AEventStatus.DRAFT;
    } else if (status.toString().equals("2")) {
      this.status = AEventStatus.PUBLISHED;
    }
    this.IsTicked = IsTicked;
    this.participationFee = participationFee;
    this.maxParticipants = maxParticipants;
  }

  public String encode() {
    return '{'
      + this.title +
      ", " + this.start.toString() +
      ", " + this.end.toString() +
      ", " + this.description +
      ", " + this.status.toString() +
      ", " + this.IsTicked +
      ", " + this.participationFee +
      ", " + this.maxParticipants +
      '}';
  }

  @Override
  public boolean equals(Object obj) {
    return super.equals(obj);
  }

  @Override
  public int hashCode() {
    return super.hashCode();
  }


  public void setTitle(String title) {
    this.title = title;
  }

  public void setStart(Date start) {
    this.start = start;
  }

  public void setEnd(Date end) {
    this.end = end;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setStatus(AEventStatus status) {
    this.status = status;
  }

  public void setTicked(boolean ticked) {
    IsTicked = ticked;
  }

  public void setParticipationFee(double participationFee) {
    this.participationFee = participationFee;
  }

  public void setMaxParticipants(int maxParticipants) {
    this.maxParticipants = maxParticipants;
  }

  public String getTitle() {
    return title;
  }

  public Date getStart() {
    return start;
  }

  public Date getEnd() {
    return end;
  }

  public String getDescription() {
    return description;
  }

  public AEventStatus getStatus() {
    return status;
  }

  public boolean isTicked() {
    return IsTicked;
  }

  public double getParticipationFee() {
    return participationFee;
  }

  public int getMaxParticipants() {
    return maxParticipants;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }
}




