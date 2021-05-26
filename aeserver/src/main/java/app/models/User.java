package app.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
  @GeneratedValue
  @Id
  private long id;

  String name;

  public User() {}

  public User(String name, String eMail, String hashedPassWord, boolean admin) {
    this.name = name;
    this.eMail = eMail;
    this.hashedPassWord = hashedPassWord;
    this.admin = admin;
  }

  String eMail;

  String hashedPassWord;

  boolean admin;

  public void setId(long id) {
    this.id = id;
  }

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String geteMail() {
    return eMail;
  }

  public void seteMail(String eMail) {
    this.eMail = eMail;
  }

  public String getHashedPassWord() {
    return hashedPassWord;
  }

  public void setHashedPassWord(String hashedPassWord) {
    this.hashedPassWord = hashedPassWord;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
