//This source code was generated using Visual Studio Design Patterns add-in
//You can find the source code and binaries at http://VSDesignPatterns.codeplex.com
using System;

namespace Stairs
{

    /// <summary>
    /// The 'Abstraction' class
    /// </summary>
    class Abstraction
    {
        // Property
        public Implementor Implementor{get;set;}

        public virtual void Operation()
        {
            Implementor.OperationImp();
        }
        /// <summary>
        /// Just for testing.
        /// </summary>
        public static void Test()
        {
            Abstraction abstraction = new RefinedAbstraction();

            // Set implementation and call
            abstraction.Implementor = new ConcreteImplementorA();
            abstraction.Operation();

            // Change implemention and call
            abstraction.Implementor = new ConcreteImplementorB();
            abstraction.Operation();
        }
    }



    /// <summary>
    /// The 'Implementor' abstract class
    /// </summary>
    abstract class Implementor
    {
        public abstract void OperationImp();
    }



    /// <summary>
    /// The 'RefinedAbstraction' class
    /// </summary>
    class RefinedAbstraction : Abstraction
    {
        public override void Operation()
        {
            Implementor.OperationImp();
        }
    }



    /// <summary>
    /// The 'ConcreteImplementorA' class
    /// </summary>
    class ConcreteImplementorA : Implementor
    {
        public override void OperationImp()
        {
            Console.WriteLine("OperationA");
        }

    }



    /// <summary>
    /// The 'ConcreteImplementorB' class
    /// </summary>
    class ConcreteImplementorB : Implementor
    {
        public override void OperationImp()
        {
            Console.WriteLine("OperationB");
        }

    }


}

