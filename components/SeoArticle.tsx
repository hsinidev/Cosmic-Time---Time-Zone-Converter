import React, { useEffect } from 'react';
import articleContent from './articleContent';

const SeoArticle: React.FC = () => {

  const faqData = [
    {
      question: "What is the difference between UTC and GMT?",
      answer: "Coordinated Universal Time (UTC) is the modern, scientific standard for timekeeping, based on atomic clocks. Greenwich Mean Time (GMT) is an older standard based on the Earth's rotation at the Royal Observatory in Greenwich, London. For most practical purposes, they are interchangeable, but UTC is the precise standard used in technology and aviation."
    },
    {
      question: "How does Daylight Saving Time (DST) work?",
      answer: "Daylight Saving Time is the practice of advancing clocks, typically by one hour, during warmer months so that darkness falls at a later clock time. This is done to make better use of natural daylight. The rules for when DST starts and ends vary significantly by country and even by region within countries."
    },
    {
      question: "Why do some countries not use time zones?",
      answer: "While most of the world uses standard time zones, a few large countries like China and India officially use a single time zone across their entire mainland. This is primarily a political and administrative decision aimed at fostering national unity. However, it can create significant discrepancies between the official clock time and solar time in the far western or eastern parts of the country."
    },
    {
      question: "How do time zone APIs handle DST changes automatically?",
      answer: "Modern time zone APIs, like the WorldTimeAPI, use comprehensive timezone databases (such as the IANA Time Zone Database) that contain historical and future DST transition rules for every location. When you request the time for a specific location and date, the API automatically calculates the correct offset by checking if DST is in effect at that moment, ensuring accurate conversions year-round."
    }
  ];

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "url": "https://your-domain.com/",
        "name": "Cosmic Time - Time Zone Converter",
        "description": "An advanced, real-time time zone converter for global teams, travelers, and professionals.",
        "publisher": {
          "@type": "Organization",
          "name": "HSINI MOHAMED",
          "logo": {
            "@type": "ImageObject",
            "url": "https://your-domain.com/logo.png"
          }
        }
      },
      {
        "@type": "WebApplication",
        "name": "Cosmic Time Converter",
        "url": "https://your-domain.com/",
        "applicationCategory": "Utilities",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0"
        }
      },
      {
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://your-domain.com/"
        },
        "headline": "The Ultimate Guide to Global Time Zones, DST, and International Coordination",
        "datePublished": "2024-07-31",
        "dateModified": "2024-07-31",
        "author": {
          "@type": "Person",
          "name": "HSINI MOHAMED"
        },
        "publisher": {
          "@type": "Organization",
          "name": "HSINI MOHAMED",
          "logo": {
            "@type": "ImageObject",
            "url": "https://your-domain.com/logo.png"
          }
        },
        "description": "A deep dive into the history of time zones, the mechanics of Daylight Saving Time, the importance of UTC, and how modern technology facilitates seamless global coordination across different time standards.",
        "articleBody": "..." // Abridged for brevity, the full content is in the component.
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  useEffect(() => {
    // FIX: Using a separate variable for the existing script to avoid a TypeScript
    // type inference issue where `script` was inferred as a generic `HTMLElement`.
    const existingScript = document.getElementById('json-ld');
    if (existingScript) {
        existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = 'json-ld';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

    return () => {
        const scriptElement = document.getElementById('json-ld');
        if (scriptElement) {
            scriptElement.remove();
        }
    }
  }, []);

  // The article content is now imported and rendered directly.
  return (
    <>
      {articleContent}
    </>
  );
};

export default SeoArticle;