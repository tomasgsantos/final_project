import React from "react";
import Header from "../../components/Header";
import "../Education/Education.css"
import VideoPlayer from "../../components/VideoPlayer";

export default function Education() {
  return (
    <div className="content">
      <Header title={"Education"} subtitle={"Learn more about COPD!"} />

      <div className="education-container">
        <div className="education-section">
          <h2>What is COPD?</h2>
          <p>
            Chronic Obstructive Pulmonary Disease (COPD) is a progressive lung
            disease that causes breathing difficulties. It includes conditions
            such as chronic bronchitis and emphysema. COPD is often caused by
            long-term exposure to harmful substances, such as cigarette smoke or
            air pollution.
          </p>
        </div>

        <div className="education-section">
          <h2>Symptoms</h2>
          <ul>
            <li>Shortness of breath</li>
            <li>Chronic cough</li>
            <li>Wheezing</li>
            <li>Tightness in the chest</li>
            <li>Frequent respiratory infections</li>
          </ul>
        </div>

        <div className="education-section">
          <h2>Treatment</h2>
          <p>
            Although COPD has no cure, there are treatments available to manage
            symptoms and slow down the progression of the disease. Treatment
            options may include medications, pulmonary rehabilitation,
            supplemental oxygen therapy, and lifestyle changes.
          </p>
        </div>

        <div className="education-section">
          <h2>Prevention</h2>
          <p>
            While COPD is not always preventable, you can reduce your risk by
            avoiding exposure to tobacco smoke and other lung irritants. If you
            smoke, quitting is the best way to prevent further damage to your
            lungs. Regular exercise and a healthy diet can also help maintain
            lung health.
          </p>
        </div>

        <div className="education-section">
          <h2>Support and Resources</h2>
          <p>
            It's important to seek support and stay informed about COPD. Here
            are some resources that can provide additional information and
            assistance:
          </p>
          <ul>
            <li>Local support groups</li>
            <li>Online communities and forums</li>
            <li>COPD helplines</li>
            <li>Educational websites and blogs</li>
            <li>COPD management apps</li>
            <li>
              <a href="https://www.who.int/news-room/fact-sheets/detail/chronic-obstructive-pulmonary-disease-(copd)">
                Learn more about COPD World Health Organization
              </a>
            </li>
          </ul>
        </div>
      </div>

      <VideoPlayer />
    </div>
  );
}
