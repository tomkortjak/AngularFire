package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Registration {
  @Id
  @GeneratedValue
  long id;

  String ticketCode;
  boolean paid;
  LocalDateTime submissionDate;

  @ManyToOne(cascade = CascadeType.PERSIST)
  @JsonIgnore
  AEvent aEvent;

  public Registration() {
  }

  public Registration(String ticketCode, boolean paid, LocalDateTime submissionDate) {
    this.ticketCode = ticketCode;
    this.paid = paid;
    this.submissionDate = submissionDate;
  }

  @Override
  public String toString() {
    return "Registration{" +
      "id=" + id +
      ", ticketCode='" + ticketCode + '\'' +
      ", paid=" + paid +
      ", submissionDate=" + submissionDate +
      ", aEvent=" + aEvent +
      '}';
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTicketCode() {
    return ticketCode;
  }

  public void setTicketCode(String ticketCode) {
    this.ticketCode = ticketCode;
  }

  public boolean isPaid() {
    return paid;
  }

  public void setPaid(boolean paid) {
    this.paid = paid;
  }

  public LocalDateTime getSubmissionDate() {
    return submissionDate;
  }

  public void setSubmissionDate(LocalDateTime submissionDate) {
    this.submissionDate = submissionDate;
  }

  public AEvent getaEvent() {
    return aEvent;
  }

  public void setaEvent(AEvent aEvent) {
    this.aEvent = aEvent;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Registration that = (Registration) o;
    return id == that.id;
  }

  public void addEvent(AEvent aEvent) {
    this.aEvent = aEvent;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
