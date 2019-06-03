// Projects Model
// Blueprint to def how project looks
// This is like a class but cannot be instanciated, we force the object to look like this.
// The interface can take fields and methods.

export interface Project {
  id: string;
  title: string;
  lead: string;
  dateDue: string;
}

