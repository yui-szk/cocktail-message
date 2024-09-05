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
  #title {
    letter-spacing: 3px;

    span {
      position: relative;
      opacity: 0;
      animation: 0.8s ease-out forwards ${bound};
    }

    #after-space {
      margin-right: 0.5rem;
    }
  }

  #title span:nth-child(1) {
    animation-delay: 0.1s;
  }

  #title span:nth-child(2) {
    animation-delay: 0.2s;
  }

  #title span:nth-child(3) {
    animation-delay: 0.3s;
  }

  #title span:nth-child(4) {
    animation-delay: 0.4s;
  }

  #title span:nth-child(5) {
    animation-delay: 0.5s;
  }

  #title span:nth-child(6) {
    animation-delay: 0.6s;
  }

  #title span:nth-child(7) {
    animation-delay: 0.7s;
  }

  #title span:nth-child(8) {
    animation-delay: 0.8s;
  }

  #title span:nth-child(9) {
    animation-delay: 1.2s;
  }

  #title span:nth-child(10) {
    animation-delay: 1.3s;
  }

  #title span:nth-child(11) {
    animation-delay: 1.4s;
  }

  #title span:nth-child(12) {
    animation-delay: 1.5s;
  }

  #title span:nth-child(13) {
    animation-delay: 1.6s;
  }

  #title span:nth-child(14) {
    animation-delay: 1.7s;
  }

  #title span:nth-child(15) {
    animation-delay: 1.8s;
  }
`;

export const Home = () => {
  return (
    <WithHTML>
      <section id="Home" class={titleAnimation}>
        <h2 id="title">
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
      </section>
    </WithHTML>
  );
};
