import createHTMLBranch from './createHTMLBranch'
import createElem from './createElem'

describe("createElem tests", () => {
  it("should be instance of HTMLElement", () => {
    const result = createElem({ tag: "div" });

    expect(result).toBeInstanceOf(HTMLElement);
  });

  it("should be instance of HTMLElement", () => {
    const result = createElem();

    expect(result).toBeInstanceOf(HTMLElement);
  });

  it("should be instance of HTMLElement", () => {
    const result = createElem({ tag: "div" });

    expect(result.tagName).toEqual("DIV");
  });

  it("should be instance of HTMLElement", () => {
    const result = createElem({ tag: "div" });

    expect(result.tagName).not.toEqual("H2");
  });

  it("should have class", () => {
    const result = createElem({ tag: "div", classList: "huia" });

    expect(result.className).toEqual("huia");
  });
  it("should have value", () => {
    const result = createElem({ tag: "div", classList: "huia", value: 'hueta'});

    expect(result.innerHTML).toEqual("hueta");
  });
});

describe("createHTMLBranch tests", () => {
  it("to have two children TEXT", () => {
    const schema1 = ["asdfsadfsad", "asdfsadfsad"];

    const container = document.createElement("div");

    createHTMLBranch(schema1, container);

    expect(container.childNodes).toHaveLength(2);
    expect(container.childNodes[0]).toBeInstanceOf(Text);
    expect(container.childNodes[1]).toBeInstanceOf(Text);
  });

  it("to have one DIV with children", () => {
    const schema2 = [{ tag: "div", childNodes: ["text"] }];

    const container = document.createElement("div");

    createHTMLBranch(schema2, container);

		expect(container.childNodes).toHaveLength(1);
		
		const div = container.childNodes[0];
		expect(div).toBeInstanceOf(HTMLElement);
		expect(div.tagName).toEqual('DIV')

		expect(div.childNodes).toHaveLength(1)
		expect(div.childNodes[0]).toBeInstanceOf(Text)
		expect(div.childNodes[0].nodeValue).toEqual("text")
	});
  it("to have value and string child in one moment", () => {
    const schema2 = [{ tag: "div", childNodes: ['huetachild'], value: 'huetavalue' }];

    const container = document.createElement("div");

    createHTMLBranch(schema2, container);
		
		const div = container.childNodes[0];
		console.log(div.childNodes[0].nodeValue)
		expect(div.childNodes).toHaveLength(2);
		expect(div.childNodes[0].nodeValue).toEqual('huetavalue')

		// expect(div.childNodes).toHaveLength(1)
		// expect(div.childNodes[0]).toBeInstanceOf(Text)
		// expect(div.childNodes[0].nodeValue).toEqual("text")
	});
});
