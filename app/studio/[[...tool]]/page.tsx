'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return (
    <>
      <style jsx global>{`
        html, body {
          overflow: auto !important;
          height: auto !important;
        }
      `}</style>
      <div style={{ height: '88vh', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <NextStudio config={config} />
      </div>
    </>
  )
}