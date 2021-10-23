import { Spinner } from 'react-bootstrap'


export function SpinnerItem() {
    return (
        <>
            <Spinner className="col-md-5 mx-auto" style={{ 'marginTop':'150px', 'marginBottom':'200px' }} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner></>
    )
}