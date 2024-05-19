import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="my-5 about-container container sidebar-right">
      <section>
        <h2>{t("about-introduction-title")}</h2>
        <p>{t("about-intro-text")}</p>
      </section>

      <section>
        <h2>{t("about-examples")}</h2>
        <div className="code-example">
          <p>{t("about-exp1-name")}</p>
          <p>x + y - z * (a / b)</p>
          <p>{t("about-exp2-name")}</p>
          <p>Sin[x] * Cos[y] + Tan[z]</p>
          <p>Arcsin[x] * Cosh[y] + Arctan[z]</p>
          <p>Arcsin[Sin[2x]]</p>
          <p>{t("about-exp3-name")}</p>
          <p>Dt[Sin[2x^2], x]</p>
          <p>{t("about-exp4-name")}</p>
          <p>D[Cos[2x^2], x]</p>
          <p>{t("about-exp5-name")}</p>
          <p>Limit[Sin[x], x, infinity]</p>
          <p>{t("about-exp6-name")}</p>
          <p>
            Sum[i^2, {"{"}i, 1, n{"}"}]
          </p>
          <p>{t("about-exp7-name")}</p>
          <p>
            Product[i^2, {"{"}i, 1, n{"}"}]
          </p>
        </div>
      </section>

      <section>
        <h2>{t("about-faq")}</h2>
        <div className="faq">
          <p>
            <strong>{t("about-faq-q1")}</strong>
          </p>
          <p>{t("about-faq-a1")}</p>
          <p>
            <strong>{t("about-faq-q2")}</strong>
          </p>
          <p>{t("about-faq-a2")}</p>
          <p>
            <strong>{t("about-faq-q3")}</strong>
          </p>
          <p>{t("about-faq-a3")}</p>
          <p>
            <strong>{t("about-faq-q4")}</strong>
          </p>
          <p>{t("about-faq-a4")}</p>
        </div>
      </section>

      <section>
        <h2>{t("about-release")}</h2>
        <p>{t("about-release-version")}</p>
        <ul>
          <li>{t("about-r1-b1")}</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
