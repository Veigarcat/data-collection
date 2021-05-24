import styled from 'styled-components';

export default styled.div`
  .report-container {
    flex-grow: 1;
    margin: 10px;
    padding-top: 1px;
  }
  .title-report {
    margin-top: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .campaign-name {
    .form-control {
      width: 100%;
    }
    .chips {
      flex-wrap: wrap;
      display: flex;
    }
  }
  .newTemplateWrapper {
    padding: 16px;

    .formControl {
      width: 100%;
    }

    .reportWrapper {
      margin-top: 16px;
    }

    .checkboxField {
      width: 100%;
    }

    .reportTypeFeilds {
      padding-left: 32px;
    }

    .dividerTemp {
      margin-top: 16px;
    }

    .MuiFormControlLabel-label {
      color: rgba(0, 0, 0, 0.87);
    }
  }
  .metaData {
    display: flex;
    justify-content: space-between;

    padding: 24px;

    .metaRow {
      padding: 8px;
    }

    .metaDataAction {
      display: flex;
      flex-direction: column;
      min-width: 184px;

      .MuiButtonBase-root {
        margin-bottom: 8px;
      }
    }
  }
  .preview {
    margin-top: 24px;
    padding-top: 24px;
    padding-left: 48px;
    padding-right: 48px;
    min-height: 400px;
    background: #ffffe0;

    .tablePreview {
      margin-top: 24px;
      background: #fff;

      .MuiTableCell-body {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 400px;
        color: rgba(0, 0, 0, 0.87);
      }

      .tableTitle {
        background: #caf7ad;
      }
      .tableSubTitle {
        background: #e5e5e5;
      }
    }

    .header {
      display: flex;
    }

    .reportTitle {
      display: flex;
      justify-content: center;
      align-items: center;

      align-self: flex-start;
      flex-grow: 1;

      .MuiInputBase-root {
        min-width: 300px;
      }
    }

    .metaDataReport {
      margin-top: 54px;
    }
  }
`;
