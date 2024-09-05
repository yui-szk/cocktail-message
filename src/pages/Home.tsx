import { css, keyframes } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";

/**
 * ホーム画面を返す
 */

const bound = keyframes`
  0% {
    top: -4rem;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    top: 0;
    opacity: 1;
  }
  75% {
    top: -1rem;
    opacity: 1;
  }
  100% {
    top: 0;
    opacity: 1;
  }
`;

const titleAnimation = css`
  font-family: var(--font-en);
  font-size: 1.75rem;
  margin: 3.5rem 0;
  text-align: center;
  letter-spacing: 3px;

  span {
    position: relative;
    opacity: 0;
    animation: 0.8s ease-out forwards ${bound};
  }

  #after-space {
    margin-right: 0.5rem;
  }

  span:nth-child(1) {
    animation-delay: 0.1s;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.3s;
  }

  span:nth-child(4) {
    animation-delay: 0.4s;
  }

  span:nth-child(5) {
    animation-delay: 0.5s;
  }

  span:nth-child(6) {
    animation-delay: 0.6s;
  }

  span:nth-child(7) {
    animation-delay: 0.7s;
  }

  span:nth-child(8) {
    animation-delay: 0.8s;
  }

  span:nth-child(9) {
    animation-delay: 1.2s;
  }

  span:nth-child(10) {
    animation-delay: 1.3s;
  }

  span:nth-child(11) {
    animation-delay: 1.4s;
  }

  span:nth-child(12) {
    animation-delay: 1.5s;
  }

  span:nth-child(13) {
    animation-delay: 1.6s;
  }

  span:nth-child(14) {
    animation-delay: 1.7s;
  }

  span:nth-child(15) {
    animation-delay: 1.8s;
  }
`;

const imageStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: calc(100svh - 15rem);
  }
`;

export const Home = () => {
  return (
    <WithHTML>
      <section id="Home">
        <h2 class={titleAnimation}>
          <span>C</span>
          <span>o</span>
          <span>c</span>
          <span>k</span>
          <span>t</span>
          <span>a</span>
          <span>i</span>
          <span id="after-space">l</span>
          <span>M</span>
          <span>e</span>
          <span>s</span>
          <span>s</span>
          <span>a</span>
          <span>g</span>
          <span>e</span>
        </h2>
        <div class={imageStyle}>
          <a href="/create">
            <img src="/public/images/cocktail-glass.svg" alt="カクテルグラス" />
          </a>
        </div>
      </section>
    </WithHTML>
  );
};
