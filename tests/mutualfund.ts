import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Mutualfund } from "../target/types/mutualfund";
import assert from "assert";

const { SystemProgram } = anchor.web3;

describe("mutualfund", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate()
  const staker = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Mutualfund as Program<Mutualfund>;

  it("Creates a Calculator", async () => {
    // Add your test here.
    const tx = await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    // assert.ok(account.greeting === "Welcome to solana", tx);

    console.log("Your transaction signature", tx);
  });

  it("Add two numbers", async () => {
    const tx = await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey
      }
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)))
  })
  it("Amount Staked", async () => {
    const tx = await program.rpc.stake(new anchor.BN(100), new anchor.BN(10), {
      accounts: {
        calculator: staker.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [staker],
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    // assert.ok(account.supply.eq(new anchor.BN(110)))
    console.log("Your transaction signature", tx);

  });
});


