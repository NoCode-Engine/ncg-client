declare class TestClass {
    mathCalc(data: {
        here?: boolean;
    }): "No" | "here we go!!!";
}

type TestClass$1_TestClass = TestClass;
declare const TestClass$1_TestClass: typeof TestClass;
declare namespace TestClass$1 {
  export { TestClass$1_TestClass as TestClass };
}

declare const WdlCore: Promise<{
    tt: typeof TestClass$1;
}>;

export { WdlCore as default };
