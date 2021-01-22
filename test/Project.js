const Project = artifacts.require("./Project.sol");

contract("Project", accounts => {
    it("should set the balance at 10000", async() => {
        const project = await Project.deployed();
        const balance = await project.totalSupply.call();

        assert.equal(balance, 10000, "Not working");
    });
});