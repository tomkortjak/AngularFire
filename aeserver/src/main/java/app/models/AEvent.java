package app.models;

import app.views.EventView;
import com.fasterxml.jackson.annotation.JsonView;
import jdk.jfr.Name;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NamedQueries({
  @NamedQuery(name ="AEvent_find_by_title",
  query = "SELECT a FROM AEvent a WHERE a.title LIKE ?1"),
  @NamedQuery(name = "AEvent_find_by_status",
  query = "SELECT a FROM AEvent a WHERE a.IsTicked = ?1"),
  @NamedQuery(name = "AEvent_find_by_minRegistrations",
  query = "SELECT a FROM AEvent a WHERE a.registrations.size > ?1")
})
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

  @OneToMany(mappedBy = "aEvent", cascade = CascadeType.PERSIST, orphanRemoval = true)
  List<Registration> registrations = new ArrayList<>();

  public AEvent() {
  }

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
  public String toString() {
    return "Title: " + title + " Id: " + id + " ";
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    AEvent aEvent = (AEvent) o;
    return id == aEvent.id;
  }

  @Override
  public int hashCode() {
    return (int) id;
  }

  public List<Registration> getRegistrations() {
    return registrations;
  }

  public void setRegistrations(List<Registration> registrations) {
    this.registrations = registrations;
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

  public void addRegistration(Registration registration) {
    this.registrations.add(registration);
  }
}
