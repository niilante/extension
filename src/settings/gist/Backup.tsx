import React, { useState } from 'react'
import { SettingsTextField, SectionHeader } from '../common'
import { isBlank } from '~/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { createBackupThunk, getBackupLoading } from '~/store/modules/backup'

import styled from 'styled-components'

export const Backup = () => {
  const dispatch = useDispatch()
  const backupLoading = useSelector(getBackupLoading)
  const [gistFilename, setGistFilename] = useState('')
  const [gistDescription, setGistDesciption] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  if (backupLoading) {
    return <p>Loading...</p>
  }

  const handleBackup = () => {
    dispatch(createBackupThunk(gistFilename, isPublic, gistDescription))
  }

  return (
    <PostAuthContainer>
      <SectionHeader>Create a new Backup</SectionHeader>
      <SettingsTextField
        style={{ marginBottom: 5 }}
        value={gistFilename}
        onChange={setGistFilename}
        label="Filename"
      />
      <SettingsTextField
        style={{ marginTop: 5, marginBottom: 5 }}
        value={gistDescription}
        onChange={setGistDesciption}
        label="Description (Optional)"
      />
      <RadioButtonContainer>
        <div>
          <label htmlFor="public">Private</label>
          <input
            type="radio"
            id="private"
            name="private"
            value="private"
            checked={!isPublic}
            onClick={() => setIsPublic(false)}
          />
        </div>

        <div>
          <label htmlFor="public">Public</label>
          <input
            type="radio"
            id="public"
            name="public"
            value="public"
            checked={isPublic}
            onClick={() => setIsPublic(true)}
          />
        </div>

        {/* <label
          checked={!isPublic}
          onClick={() => setIsPublic(false)}
          value="private"
          control={<Radio color="primary" />}
          label="Private"
          labelPlacement="start"
        />
        <FormControlLabel
          checked={isPublic}
          onClick={() => setIsPublic(true)}
          value="public"
          control={<Radio color="secondary" />}
          label="Public"
          labelPlacement="start"
        /> */}
      </RadioButtonContainer>
      <button disabled={isBlank(gistFilename)} onClick={handleBackup}>
        Create Backup
      </button>
    </PostAuthContainer>
  )
}

const PostAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`

const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 400px;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  justify-content: space-evenly;
`
