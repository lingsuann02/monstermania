import { render, screen } from "@testing-library/react";
import { HpBar } from "./hpBar";
import { randomUUID } from "crypto";
import "@testing-library/jest-dom";

const monster = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Owl",
  type: "< o v o >",
  color: "000000",
  hp: 40,
};

const settings = {
  startingHp: 50,
  snack1: 3,
  snack2: 5,
  snack3: 6,
  poisonPercentage: 50,
};

describe("HpBar", () => {
  it("renders full bar", () => {
    monster.hp = 50;
    render(<HpBar monster={monster} settings={settings} />);
    expect(screen.getByText("50/50")).toBeTruthy();
    expect(screen.getByRole("progressbar").childNodes[0]).toHaveStyle({
      transform: "translateX(-0%)",
    });
  });

  it("renders half full bar", () => {
    monster.hp = 25;

    render(<HpBar monster={monster} settings={settings} />);
    expect(screen.getByText("25/50")).toBeTruthy();
    expect(screen.getByRole("progressbar").childNodes[0]).toHaveStyle({
      transform: "translateX(-50%)",
    });
  });

  it("renders empty bar", () => {
    monster.hp = 0;
    render(<HpBar monster={monster} settings={settings} />);
    expect(screen.getByText("Fainted")).toBeTruthy();
    expect(screen.getByRole("progressbar").childNodes[0]).toHaveStyle({
      transform: "translateX(-100%)",
    });
  });
});
