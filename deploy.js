async function main() {

const SocialMedia= await ethers.getContractFactory("SocialMedia");
console.log("Runned getcontractfactory");
const SocialMedia_Dapp = await SocialMedia.deploy();
await SocialMedia_Dapp.waitForDeployment();


console.log("My SocialMedia Dapp deployed to:",SocialMedia_Dapp.target);

}

main()
.then(()=>process.exit(0))
.catch((error)=> {
 console.error(error);
 process.exit(1);

});