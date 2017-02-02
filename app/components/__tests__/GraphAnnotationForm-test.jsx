import React from "react";
import { shallow, mount } from "enzyme";
import GraphAnnotationForm from "../GraphAnnotationForm";
import Editor from "react-medium-editor";

describe("GraphAnnotationForm", () => {
  let wrapper;
  let annotation = {
    header: "Header",
    text: "This is some text to test."
  };
  let remove;
  let update;
  let create;

  beforeEach(() => {
    remove = jest.genMockFunction();
    update = jest.genMockFunction();
    create = jest.genMockFunction();
    wrapper = mount(
      <GraphAnnotationForm
        annotation={annotation}
        remove={remove}
        update={update}
        create={create} />
    );
  });

  describe("rendering", () => {
    it("shows header input", () => {
      let header = wrapper.ref("header");
      expect(header.props().value).toBe(annotation.header);
    });

    it("shows text editor", () => {
      let text = wrapper.find(Editor);
      expect(text.props().text).toBe(annotation.text);
    });

    it("shows delete button", () => {
      let button = wrapper.find("button.btn-danger");
      expect(button.text()).toBe("Remove");
    });

    it("shows add button", () => {
      let button = wrapper.find("button.btn-primary");
      expect(button.text()).toBe("New Annotation");
    });
  });

  describe("behavior", () => {
    it("updates annotation with new header", () => {
      let header = wrapper.ref("header");
      header.get(0).value = "New Header";
      header.simulate("change");

      expect(update.mock.calls.length).toBe(1);
      expect(update.mock.calls[0][0].header).toBe("New Header");
    });

    it("updates annotation with new text", () => {
      let editor = wrapper.ref("text");
      let newText = "This is some EDITED text to test.";
      editor.get(0).props.onChange(newText);

      expect(update.mock.calls.length).toBe(1);
      expect(update.mock.calls[0][0].text).toBe(newText);
    });

    it("creates annotation when create annotation button is pressed", () => {
      let button = wrapper.find("button.btn-primary");
      button.simulate("click");
      expect(create.mock.calls.length).toBe(1);
    });

    it("removes annotation when delete button is clicked", () => {
      let button = wrapper.find("button.btn-danger");
      spyOn(window, 'confirm').and.returnValue(true);
      button.simulate("click");

      expect(remove.mock.calls.length).toBe(1);
    });
  });
});
