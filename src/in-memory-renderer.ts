import { Renderer, RootRenderer, RenderComponentType, NgModule, APP_INITIALIZER, NgZone } from '@angular/core';

export type Node = Element | View | Text;

// We render everything into a forest of Nodes.
// View, Element, and Text are different types of nodes.
export class View {
  children: Node[] = [];
}

export class Text {
  constructor(public value: string) {}
}

export class Element {
  attributes: {[n: string]: string} = {};
  properties: {[n: string]: any} = {};
  children: Node[] = [];
  view: View = null;
  constructor(public name: string) {}
}

// We define a custom in-memory renderer.
// To make thing simpler we only support a subset of all the operations.
// We support element creation, text creation, and setting attributes and properties.
export class InMemoryRootRenderer implements RootRenderer {
  public roots: any[] = [];

  renderComponent(componentProto: RenderComponentType): Renderer {
    return new InMemoryRenderer(this.roots);
  }
}

export class InMemoryRenderer implements Renderer {
  constructor(private roots: any[]) {}

  selectRootElement(selectorOrNode: string|any, debugInfo?: any): Element {
    const root = new Element(selectorOrNode);
    this.roots.push(root);
    return root;
  }

  createElement(parentElement: any, name: string, debugInfo?: any): Element {
    const element = new Element(name);
    // parentElement.children.push(element);
    return element;
  }

  createViewRoot(hostElement: Element): View {
    const view = new View();
    hostElement.view = view;
    return view;
  }

  createText(parentElement: Element, value: string, debugInfo?: any): Text {
    const text = new Text(value);
    // parentElement.children.push(text as any);
    return text;
  }

  setElementProperty(renderElement: Element, propertyName: string, propertyValue: any): void {
    renderElement.properties[propertyName] = propertyValue;
  }

  setElementAttribute(renderElement: Element, attributeName: string, attributeValue: string): void {
    renderElement.attributes[attributeName] = attributeValue;
  }

  setText(renderNode: Text, text: string): void {
    renderNode.value = text;
  }

  setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): void {
    // todo
  }

  createTemplateAnchor(parentElement: any): any {
    // throw new Error('not implemented');
  }

  projectNodes(parentElement: any, nodes: any[]): void {
    // throw new Error('not implemented');
  }

  attachViewAfter(node: any, viewRootNodes: any[]): void {
    // throw new Error('not implemented');
  }

  detachView(viewRootNodes: any[]): void {
    // throw new Error('not implemented');
  }

  destroyView(hostElement: any, viewAllNodes: any[]): void {
    // throw new Error('not implemented');
  }

  listen(renderElement: any, name: string, callback: Function): any {
    // throw new Error('not implemented');
  }

  listenGlobal(target: string, name: string, callback: Function): any {
    // throw new Error('not implemented');
  }

  setElementClass(renderElement: any, className: string, isAdd: boolean): void {
    // throw new Error('not implemented');
  }

  setElementStyle(renderElement: any, styleName: string, styleValue: string): void {
    // throw new Error('not implemented');
  }

  invokeElementMethod(renderElement: any, methodName: string, args?: any[]): void {
    // throw new Error('not implemented');
  }

  animate(element: any, startingStyles: any, keyframes: any[], duration: number, delay: number, easing: string): any {
    // throw new Error('not implemented');
  }
}

// We print a new snapshot every time the zone gets stable.
// That would be the moment when the browse would modify the DOM.
export function setUpRenderFlushing(zone: NgZone, renderer: InMemoryRootRenderer) {
  return () => {
    zone.onStable.subscribe(() => {
      // console.group('--');
      // console.log(renderer.roots);
      // console.log(JSON.stringify(renderer.roots, null, 2));
      // console.groupEnd();
    });
  };
}
