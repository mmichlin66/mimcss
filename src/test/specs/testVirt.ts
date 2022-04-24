import {
    isArray, isEmpty, isFunction, isNull, isObject, isObjectOrNull, isPOJO, isProxy, isUndefined, virt
} from "../../api/Virt"


describe("virtualization proxy", () =>
{
    describe("single object", () =>
    {
        describe("isXXX", () =>
        {
            it("isProxy", () =>
            {
                expect(isProxy( null )).toBeFalse();
                expect(isProxy( 1 )).toBeFalse();
                expect(isProxy( "hello" )).toBeFalse();
                expect(isProxy( {} )).toBeFalse();
                expect(isProxy( ()=>{} )).toBeFalse();

                expect(isProxy( virt(null) )).toBeTrue();
                expect(isProxy( virt({}) )).toBeTrue();
                expect(isProxy( virt(()=>{}) )).toBeTrue();

                expect(isProxy( virt(virt({})) )).toBeTrue();
            })

            it("isUndefined", () =>
            {
                expect(isUndefined( null )).toBeFalse();
                expect(isUndefined( 1 )).toBeFalse();
                expect(isUndefined( "hello" )).toBeFalse();
                expect(isUndefined( {} )).toBeFalse();
                expect(isUndefined( undefined )).toBeTrue();

                expect(isUndefined( virt(null) )).toBeFalse();
                expect(isUndefined( virt({}) )).toBeFalse();
                expect(isUndefined( virt(undefined) )).toBeTrue();

                expect(isUndefined( virt(virt({})) )).toBeFalse();
                expect(isUndefined( virt(virt(undefined)) )).toBeTrue();
            })

            it("isNull", () =>
            {
                expect(isNull( null )).toBeTrue();
                expect(isNull( 1 )).toBeFalse();
                expect(isNull( "hello" )).toBeFalse();
                expect(isNull( {} )).toBeFalse();
                expect(isNull( undefined )).toBeFalse();

                expect(isNull( virt(null) )).toBeTrue();
                expect(isNull( virt({}) )).toBeFalse();
                expect(isNull( virt(undefined) )).toBeFalse();

                expect(isNull( virt(virt(null)) )).toBeTrue();
                expect(isNull( virt(virt(undefined)) )).toBeFalse();
            })

            it("isEmpty", () =>
            {
                expect(isEmpty( null )).toBeTrue();
                expect(isEmpty( 1 )).toBeFalse();
                expect(isEmpty( "hello" )).toBeFalse();
                expect(isEmpty( {} )).toBeFalse();
                expect(isEmpty( undefined )).toBeTrue();

                expect(isEmpty( virt(null) )).toBeTrue();
                expect(isEmpty( virt({}) )).toBeFalse();
                expect(isEmpty( virt(undefined) )).toBeTrue();

                expect(isEmpty( virt(virt(null)) )).toBeTrue();
                expect(isEmpty( virt(virt(undefined)) )).toBeTrue();
            })

            it("isObject", () =>
            {
                class A {}
                let a = new A();

                expect(isObject( null )).toBeFalse();
                expect(isObject( 1 )).toBeFalse();
                expect(isObject( "hello" )).toBeFalse();
                expect(isObject( {} )).toBeTrue();
                expect(isObject( undefined )).toBeFalse();
                expect(isObject( a )).toBeTrue();
                expect(isObject( ()=>{} )).toBeFalse();

                expect(isObject( virt(null) )).toBeFalse();
                expect(isObject( virt({}) )).toBeTrue();
                expect(isObject( virt(undefined)) ).toBeFalse();
                expect(isObject( virt(a) )).toBeTrue();
                expect(isObject( virt(()=>{}) )).toBeFalse();

                expect(isObject( virt(virt(null))) ).toBeFalse();
                expect(isObject( virt(virt({}))) ).toBeTrue();
                expect(isObject( virt(virt(a))) ).toBeTrue();
                expect(isObject( virt(virt(()=>{})) )).toBeFalse();
            })

            it("isObjectOrNull", () =>
            {
                class A {}
                let a = new A();

                expect(isObjectOrNull( null )).toBeTrue();
                expect(isObjectOrNull( 1 )).toBeFalse();
                expect(isObjectOrNull( "hello" )).toBeFalse();
                expect(isObjectOrNull( {} )).toBeTrue();
                expect(isObjectOrNull( undefined )).toBeFalse();
                expect(isObjectOrNull( a )).toBeTrue();
                expect(isObjectOrNull( ()=>{} )).toBeFalse();

                expect(isObjectOrNull( virt(null) )).toBeTrue();
                expect(isObjectOrNull( virt({}) )).toBeTrue();
                expect(isObjectOrNull( virt(undefined)) ).toBeFalse();
                expect(isObjectOrNull( virt(a) )).toBeTrue();
                expect(isObjectOrNull( virt(()=>{}) )).toBeFalse();

                expect(isObjectOrNull( virt(virt(null))) ).toBeTrue();
                expect(isObjectOrNull( virt(virt({}))) ).toBeTrue();
                expect(isObjectOrNull( virt(virt(a))) ).toBeTrue();
                expect(isObjectOrNull( virt(virt(()=>{})) )).toBeFalse();
            })

            it("isPOJO", () =>
            {
                class A {}
                let a = new A();

                expect(isPOJO( null )).toBeFalse();
                expect(isPOJO( 1 )).toBeFalse();
                expect(isPOJO( "hello" )).toBeFalse();
                expect(isPOJO( {} )).toBeTrue();
                expect(isPOJO( undefined )).toBeFalse();
                expect(isPOJO( a )).toBeFalse();

                expect(isPOJO( virt(null) )).toBeFalse();
                expect(isPOJO( virt({}) )).toBeTrue();
                expect(isPOJO( virt(undefined) )).toBeFalse();
                expect(isPOJO( virt(a) )).toBeFalse();

                expect(isPOJO( virt(virt(null)) )).toBeFalse();
                expect(isPOJO( virt(virt({})) )).toBeTrue();
                expect(isPOJO( virt(virt(a)) )).toBeFalse();
            })

            it("isArray", () =>
            {
                class A {}
                let a = new A();

                expect(isArray( null )).toBeFalse();
                expect(isArray( 1 )).toBeFalse();
                expect(isArray( "hello" )).toBeFalse();
                expect(isArray( {} )).toBeFalse();
                expect(isArray( undefined )).toBeFalse();
                expect(isArray( a )).toBeFalse();
                expect(isArray( [] )).toBeTrue();

                expect(isArray( virt(null) )).toBeFalse();
                expect(isArray( virt({}) )).toBeFalse();
                expect(isArray( virt(undefined) )).toBeFalse();
                expect(isArray( virt(a) )).toBeFalse();
                expect(isArray( virt([]) )).toBeTrue();

                expect(isArray( virt(virt(null)) )).toBeFalse();
                expect(isArray( virt(virt({})) )).toBeFalse();
                expect(isArray( virt(virt(a)) )).toBeFalse();
                expect(isArray( virt(virt([])) )).toBeTrue();
            })

            it("isFunction", () =>
            {
                class A {}
                let a = new A();

                expect(isFunction( null )).toBeFalse();
                expect(isFunction( 1 )).toBeFalse();
                expect(isFunction( "hello" )).toBeFalse();
                expect(isFunction( {} )).toBeFalse();
                expect(isFunction( undefined )).toBeFalse();
                expect(isFunction( a )).toBeFalse();
                expect(isFunction( [] )).toBeFalse();
                expect(isFunction( ()=>{} )).toBeTrue();

                expect(isFunction( virt(null) )).toBeFalse();
                expect(isFunction( virt({}) )).toBeFalse();
                expect(isFunction( virt(undefined) )).toBeFalse();
                expect(isFunction( virt(a) )).toBeFalse();
                expect(isFunction( virt([]) )).toBeFalse();
                expect(isFunction( virt(()=>{}) )).toBeTrue();

                expect(isFunction( virt(virt(null)) )).toBeFalse();
                expect(isFunction( virt(virt({})) )).toBeFalse();
                expect(isFunction( virt(virt(a)) )).toBeFalse();
                expect(isFunction( virt(virt([])) )).toBeFalse();
                expect(isFunction( virt(virt(()=>{})) )).toBeTrue();
            })
        })
    })
})



